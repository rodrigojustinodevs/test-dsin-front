import { useEffect, useState } from "react";
import DeleteEventsModal from "../DeleteEventsModal";
import { AlertColor } from "@mui/lab";


import { Add, Delete, Edit } from "@mui/icons-material";
import styles from "./cardTable.module.less";
import {
  GridColDef, 
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import TableDataGrid from "../TableDataGrid";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

import ButtonGeneric from "../ButtonGeneric";
import Toast from "../Toast";
import { TransformDate } from "../../helpers/transformDate";


interface TableData {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

export function CardTable() {
  const navigate = useNavigate();

  const [loadingTable, setLoadingTable] = useState(true);
  const [events, setEvents] = useState<TableData[]>([]);
  const [openDeleteEventsModal, setOpenDeleteEventsModal] = useState(false);
  const handleCloseDeletePlanModal = () => {
    setOpenDeleteEventsModal(false);
  };
  const [selectedRowPlan, setSelectedRowPlan] = useState("");

  // toast configs
  const [openToast, setOpenToast] = useState(false);
  function handleCloseToast() {
      setOpenToast(false);
  }
  const [toastRequisitionResult, setToastRequisitionResult] =
      useState<AlertColor>();
  const [textToast, setTextToast] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);





  useEffect(() => {
    api.get("/events")
        .then((response) => {
            setEvents(response.data.response);
            setLoadingTable(false)
        })
        .catch((error) => {
          setOpenToast(true);
          setToastRequisitionResult("error");
          setTextToast(error.response.data.message);          
        });
  }, []);

  const flattenedData = events.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    start_date: TransformDate(item.start_date),
    end_date: TransformDate(item.end_date), 
  }));

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 65 },
    { field: 'description', headerName: 'Descrição', flex: 65 },
    { field: 'start_date', headerName: 'Data de Início', flex: 30 },
    { field: 'end_date', headerName: 'Data Final', flex: 65 },
    {
      field: "ações",
      headerName: "Ações",
      flex: 35,
      sortable: false,
      align: "right",
      headerAlign: "right",
      disableExport: true,
      renderCell: (params: GridRenderCellParams) => (
          <div style={{ display: "flex", gap: "5px" }}>
                <Edit
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        navigate(
                            `/eventEdit?id=${params.id}`
                        );
                    }}
                />
                <Delete
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenDeleteEventsModal(true);
                    }}
                />
          </div>
      ),
    },
  ];
  return (
    <div className={styles.container}>  
      <div className={styles["content-header"]}>
        <h1>Eventos</h1>

      </div>

      <TableDataGrid
          rows={flattenedData}
          columns={columns}
          loading={loadingTable}
          onRowClick={(rowParams: GridRowParams) => {
            setSelectedRowPlan(rowParams.row);
        }}
      />
      <DeleteEventsModal
          openDeleteEventModal={openDeleteEventsModal}
          handleCloseDeleteEventModal={handleCloseDeletePlanModal}
          selectedRowEvent={selectedRowPlan}
      />
      <ButtonGeneric
          onclick={() => {
              navigate("/newEvent");
          }}
          buttonColor="var(--primary)"
          text="Evento"
          icon={<Add />}
      />
      <Toast
          open={openToast}
          onClose={() => handleCloseToast()}
          severity={toastRequisitionResult}
          text={textToast}
      />
</div>
  );
}
