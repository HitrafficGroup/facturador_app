
import SimpleBar from "simplebar-react";
import { Layout } from "../dashboard/layout";
import { Routes,Route } from "react-router";
import HomeView from "./HomeView";
import PersonasView from "./PersonasView";
import ProductosView from "./ProductosView";
import ProformasView from "./ProformasView";
import OrdenesView from "./OrdenesView";
export default function DashboardView(){



    return(
            <>
                <Layout>
                    <SimpleBar style={{ maxHeight: '90vh' }}>
                        <Routes>
                            <Route path="/personas"  element={<PersonasView />} />
                            <Route path="/productos"  element={<ProductosView />} />
                            <Route path="/proformas"  element={<ProformasView />} />
                            <Route path="/ordenes"  element={<OrdenesView />} />
                        </Routes>
                    </SimpleBar>
                </Layout>
            </>
        );


}