export type ParkItem = {
  periodTicketAmount: number;
  periodDayTimeAmount: number;
  periodNightAmount: number;
  periodTransTicketAmount: number;
  periodTransDayTimeAmount: number;
  periodTransNightAmount: number;
  gradeInfoList?: unknown;
  periodUseDivisionCode: string;
  periodAllotType: string;
  parkingDivisionCode: string;
  parkingDivisionName: string;
  parkingId: number;
  parkingName: string;
  sectnId: number;
  sectnName: string;
  sectnDescribe: string;
  zipcode: string;
  addr: string;
  addrDetail: string;
  sidoName: string;
  sigunguName: string;
  roadName: string;
  buildingSubNo: string;
  buildingMainNo: string;
  detailBuildingName: string;
  transYn: "Y" | "N";
  bigGradeYn: "Y" | "N";
  baseYn: string;
  muinYn: "Y" | "N";
  simpleSettingYn: "Y" | "N";
  extraParkingYn: "Y" | "N";
  periodOpenYn: "Y" | "N";
  anyhourRunYn: "Y" | "N";
  currentPeriodWaitingCount: number;
  lat: string;
  lng: string;
  periodType: string;
  telNo: string;
  cellCount: number;
  handicapCellCount: number;
  smallCarCellCount: number;
  electricCellCount: number;
  elderlyCellCount: number;
  womanFirstCellCount: number;
  periodCellCount: number;
  parkCount: number;
  quarter: number;
  usingMonth: number;
};

export type ParkingStatus = {
  key: "available" | "normal" | "crowded" | "veryCrowded" | "full";
  label: "여유" | "보통" | "혼잡" | "매우 혼잡" | "만차";
  range: [number, number];
};

export const sigunguNames = [
  "강서구",
  "금정구",
  "남구",
  "동구",
  "동래구",
  "부산진구",
  "북구",
  "사상구",
  "사하구",
  "서구",
  "수영구",
  "연제구",
  "영도구",
  "중구",
  "해운대구",
];
