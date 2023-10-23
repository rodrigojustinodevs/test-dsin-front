import {
    DataGrid,
    ptBR,
    DataGridProps,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { If } from "../If";

const styleTableButtons = {
    color: "white",
    background: "var(--primary)",
};

function TableDataGrid({
    rows,
    columns,
    loading,
    onRowClick,
    getRowId,
}: DataGridProps) {
    return (
        <DataGrid
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{ padding: "10px", boxShadow: "0px 0px 7px #8888889e" }}
            rows={rows}
            columns={columns}
            onRowClick={onRowClick}
            hideFooterSelectedRowCount
            loading={loading}
            getRowId={getRowId}
            disableColumnMenu
            components={{
                // eslint-disable-next-line react/no-unstable-nested-components
                Toolbar: () => {
                    return (
                        <GridToolbarContainer
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <GridToolbarFilterButton
                                style={styleTableButtons}
                            />
                            <If condition>
                                <GridToolbarExport style={styleTableButtons} />
                            </If>
                        </GridToolbarContainer>
                    );
                },
            }}
        />
    );
}

export default TableDataGrid;
