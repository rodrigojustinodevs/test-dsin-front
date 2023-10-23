import { useEffect, useState } from "react";
import DeleteRegistrationModal from "../DeleteRegistrationModal";
import { AlertColor } from "@mui/lab";


import { Add, Delete, Edit } from "@mui/icons-material";
import styles from "./RegistrationTable.module.less";
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


interface TableData {
  id: number;
  name: string;
  description: string;
  user: {
    id: string;
    name: string;
  };
  event: {
    id: string;
    name: string;
  };
}

export function RegistrationTable() {
  const navigate = useNavigate();

  const [loadingTable, setLoadingTable] = useState(true);
  const [registration, setRegistration] = useState<TableData[]>([]);
  const [openDeleteRegistrationModal, setOpenDeleteRegistrationModal] = useState(false);
  const handleCloseDeletePlanModal = () => {
    setOpenDeleteRegistrationModal(false);
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
    api.get("/registrations")
        .then((response) => {
            setRegistration(response.data.response);
            setLoadingTable(false)
        })
        .catch((error) => {
          setOpenToast(true);
          setToastRequisitionResult("error");
          setTextToast(error.response.data.message);          
        });
  }, []);

  const flattenedData = registration.map(item => ({
    id: item.id,
    description: item.description,
    user: item.user.name,
    event: item.event.name, 
  }));

  const columns: GridColDef[] = [
    { field: 'description', headerName: 'Descrição', flex: 65 },
    { field: 'user', headerName: 'Inscrito', flex: 65 },
    { field: 'event', headerName: 'Evento', flex: 65 },
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
                            `/registrationEdit?id=${params.id}`
                        );
                    }}
                />
                <Delete
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenDeleteRegistrationModal(true);
                    }}
                />
          </div>
      ),
    },
  ];
  return (
    <div className={styles.container}>  
      <div className={styles["content-header"]}>
        <h1>Inscrições</h1>

      </div>

      <TableDataGrid
          rows={flattenedData}
          columns={columns}
          loading={loadingTable}
          onRowClick={(rowParams: GridRowParams) => {
            setSelectedRowPlan(rowParams.row);
        }}
      />
      <DeleteRegistrationModal
          openDeleteEventModal={openDeleteRegistrationModal}
          handleCloseDeleteEventModal={handleCloseDeletePlanModal}
          selectedRowEvent={selectedRowPlan}
      />
      <ButtonGeneric
          onclick={() => {
              navigate("/newRegistration");
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
