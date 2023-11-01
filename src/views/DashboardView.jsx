
import SimpleBar from "simplebar-react";
import { Layout } from "../dashboard/layout";
import { Routes,Route } from "react-router";
import HomeView from "./HomeView";
export default function DashboardView(){



    return(
            <>
                <Layout>
                    <SimpleBar style={{ maxHeight: '90vh' }}>
                        <Routes>
                            <Route path="home" element={<HomeView />} />
                        </Routes>
                    </SimpleBar>
                </Layout>
            </>
        );


}