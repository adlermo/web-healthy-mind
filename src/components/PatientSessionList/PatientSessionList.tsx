import React from 'react'
import SideMenu from '../SideMenu/SideMenu';
import { Layout } from 'antd';

const PatientSessionList: React.FC = () => {
    const { Footer } = Layout;

    return(
        <Layout>
            <SideMenu />
            <Layout>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Mente Sã ©2020 Created by Dev4Tech
                </Footer>
            </Layout>
        </Layout>
    )
}

export default PatientSessionList;