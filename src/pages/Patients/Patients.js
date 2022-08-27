import React from 'react';
import { Layout } from 'antd';
import SideMenu from '../../components/SideMenu';
import './Patients.css';


const Patients = () => {
  const { Footer } = Layout;

  return (
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
};

export default Patients;