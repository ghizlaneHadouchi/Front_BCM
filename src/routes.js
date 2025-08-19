import React from 'react'

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Profile = React.lazy(() => import('./views/profile/Profile.js'))

const AchDashboard = React.lazy(() => import('./views/activité/ach/Dashboard.js'))
const RtgsMouvement = React.lazy(() => import('./views/activité/rtgs/Mouvement.js'))

const Incident = React.lazy(() => import('./views/incident/IncidentManagement.js'))

const Vulnerability = React.lazy(() => import('./views/vulnerability/VulnerabilityManagement.js'))
const ScanVulnerabilityDetails = React.lazy(
  () => import('./views/vulnerability/ScanVulnerabilityDetails.js'),
)

const Bt = React.lazy(() => import('./views/csd/Bt.js'))
const BtDetails = React.lazy(() => import('./views/csd/BtDetails.js'))

const BtInProgress = React.lazy(() => import('./views/csd/BtInProgress.js'))
const OtInProgress = React.lazy(() => import('./views/csd/OtInProgress.js'))
const BitInProgress = React.lazy(() => import('./views/csd/BitInProgress.js'))

const Transactions = React.lazy(() => import('./views/wallet/Transactions.js'))

const RoutesComponent = () => {
  const routes = [
    { path: '/profile', name: 'Profile', element: <Profile /> },
    { path: '/reporting/ach/virement', name: 'ACH / Virement', element: <AchDashboard /> },
    {
      path: '/reporting/rtgs/mouvement',
      name: 'RTGS / Mouvement de Réserve',
      element: <RtgsMouvement />,
    },
    { path: '/gestionIncident', name: "Gestion d'incidents", element: <Incident /> },
    {
      path: '/gestionVulnérabilité',
      name: 'Gestion de Vulnérabilités',
      element: <Vulnerability />,
    },
    {
      path: '/détailsScan',
      name: 'Détails Scan',
      element: <ScanVulnerabilityDetails />,
    },
    // { path: '/csd/bt', name: 'CSD / BT', element: <Bt /> },
    // { path: '/csd/bt/details/:id', name: 'CSD / BT / Details', element: <BtDetails /> },

    { path: '/csd/bt/inProgress', name: 'CSD / BT / En Cours', element: <BtInProgress /> },
    { path: '/csd/ot/inProgress', name: 'CSD / OT / En Cours', element: <OtInProgress /> },
    { path: '/csd/bit/inProgress', name: 'CSD / BIT / En Cours', element: <BitInProgress /> },

    { path: '/wallet/transactions', name: 'Wallet / Transactions', element: <Transactions /> },

    { path: '/*', name: '404', element: <Page404 /> },
  ]

  return routes
}

export default RoutesComponent
