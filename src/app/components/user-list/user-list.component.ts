import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  private userList: User[];
  private displayedColumns: string[] = [
    "firstName",
    "lastName",
    "postNumber",
    "city",
    "telephone"
  ];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // this.loadUserList();
  }
  // if getting user list from DB
  loadUserList() {
    // this.userList = this.userService.getBlogPosts();
  }

  onFileUpload($event): void {
    this.userList = $event;
  }

  onSave($event): void {
    const users = [];
    for (const user of this.userList) {
      if (
        typeof user.postNumber === "string" &&
        user.postNumber.match("^[0-9]*$")
      ) {
        const newUser: User = {
          firstName: user.firstName,
          lastName: user.lastName,
          postNumber: +user.postNumber,
          city: user.city,
          telephone: user.telephone
        };

        users.push(newUser);
      }
    }

    this.userService.saveUsers(users).subscribe(
      response => {
        console.log(response);
        this.snackBar.open("Save successful!", "", {
          duration: 5000,
          verticalPosition: "top"
        });
      },
      error => {
        console.log(error);
        this.snackBar.open(error, "", {
          duration: 5000,
          verticalPosition: "top"
        });
      }
    );
  }

  checkForErrors(row: User): string {
    if (
      typeof row.postNumber === "string" &&
      !row.postNumber.match("^[0-9]*$")
    ) {
      return "error";
    } else {
      return "";
    }
  }
}
