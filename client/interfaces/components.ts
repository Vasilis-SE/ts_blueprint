export interface IErrorAlert {
  title: string;
  content: string;
}

export interface INotifyModal {
  show: boolean;
  title: string;
  content: string;
  close: Function;
}
