import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Head from "../../components/Head";

const Dashboard = () => {
  return (
    <>
      <Head title="Dashboard">
        <meta name="description" content="Dashboard" />
      </Head>
      <DashboardLayout title="Dashboard">
        <p className="mt-1.5 text-sm text-gray-500">
          Your website has seen a 52% increase in traffic in the last
          month. Keep it up! 🚀
        </p>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
