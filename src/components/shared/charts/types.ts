export interface BaseChartData {
  name: string;
}

export interface BarChartData extends BaseChartData {
  total: number;
}

export interface LineChartData extends BaseChartData {
  total: number;
}

export interface AreaChartData extends BaseChartData {
  total: number;
}

export interface PieChartData extends BaseChartData {
  value: number;
}

export type ChartData = BarChartData | LineChartData | AreaChartData | PieChartData;

export interface ChartDataset {
  title: string;
  data: ChartData[];
}

export interface ChartDataType {
  barChart: ChartDataset;
  lineChart: ChartDataset;
  areaChart: ChartDataset;
  pieChart: ChartDataset;
} 