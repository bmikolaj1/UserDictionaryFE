import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { User } from "src/app/models/user";

@Component({
  selector: "app-actions",
  templateUrl: "./actions.component.html",
  styleUrls: ["./actions.component.css"]
})
export class ActionsComponent implements OnInit {
  private records: User[];
  @Output() loadRecords: EventEmitter<User[]>;
  @Output() save: EventEmitter<MouseEvent>;
  @ViewChild("csvReader", null) csvReader: any;

  constructor() {
    this.loadRecords = new EventEmitter<User[]>();
    this.save = new EventEmitter<MouseEvent>();
  }

  ngOnInit() {}

  uploadListener($event: any): void {
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0], "UTF-8");

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray);
        this.loadRecords.emit(this.records);
      };

      reader.onerror = function() {
        console.log("error is occured while reading file!");
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength?: any) {
    const csvArr = [];

    for (let i = 0; i < csvRecordsArray.length - 1; i++) {
      const curruntRecord = csvRecordsArray[i].split(";");
      const csvRecord: User = new User();
      csvRecord.firstName = curruntRecord[0].trim();
      csvRecord.lastName = curruntRecord[1].trim();
      csvRecord.postNumber = curruntRecord[2].trim();
      csvRecord.city = curruntRecord[3].trim();
      csvRecord.telephone = curruntRecord[4].trim();
      csvArr.push(csvRecord);
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  clearRecords(): void {
    this.fileReset();
    this.loadRecords.emit(null);
  }

  saveRecords(event): void {
    this.save.emit(event);
  }
}
