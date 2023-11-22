
import SimpleBar from "simplebar-react";
import { Layout } from "../dashboard/layout";
import { Routes,Route } from "react-router";
import PersonasView from "./PersonasView";
import ProductosView from "./ProductosView";
import ProformasView from "./ProformasView";
import ConfigView from "./ConfigView";
import ServiciosView from "./ServiciosView";
import FacturarView from "./FacturarView";
export default function DashboardView(){



    return(
            <>
                <Layout>
                    <SimpleBar style={{ maxHeight: '90vh' }}>
                        <Routes>
                            <Route path="/personas"  element={<PersonasView />} />
                            <Route path="/productos"  element={<ProductosView />} />
                            <Route path="/servicios"  element={<ServiciosView />} />
                            <Route path="/proformas"  element={<ProformasView />} />
                            <Route path="/facturador"  element={<FacturarView />} />
                            <Route path="/configuraciones"  element={<ConfigView />} />
                        </Routes>
                    </SimpleBar>
                </Layout>
            </>
        );


}