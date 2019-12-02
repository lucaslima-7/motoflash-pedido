import React from 'react';
import { unixtimestampToDate } from "app/utils/DateUtil"
import defaultTheme from 'app/config/themes/defaultTheme';
import NumberUtil from "app/utils/NumberUtil";
import ChipStatus from "app/main/components/chipStatus/ChipStatus";

const tableStyle = {
  cellStyle: { fontSize: 14, paddingTop: 8, paddingBottom: 8 },
  headerStyle: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 900,
    textTransform: "uppercase",
    color: defaultTheme.palette.primary.main,
  }
};

const columns = [
  {
    title: "Coleta",
    render: rowData => (
      rowData.points ?
        (
          rowData.points[0].address.address1
        ) : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "Entrega",
    render: rowData => (
      rowData.points ?
        (
          rowData.points[1].address.address1
        ) : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "Valor",
    render: rowData => (
      rowData.quotation ?
        NumberUtil.getDoubleAsCurrency(rowData.quotation.price) : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "Status",
    render: rowData => (
      rowData.status ? <ChipStatus status={rowData.status} /> : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    }
  },
  {
    title: "Criado Em",
    render: rowData => (
      rowData.createdDate ?
        unixtimestampToDate(rowData.createdDate.seconds * 1000)
        : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    }
  }
];

const options = {
  maxBodyHeight: "60vh",
  headerStyle: {
    ...tableStyle.headerStyle
  }
};

export const workOrdersTableConfig = {
  title: "",
  columns,
  options
};
