import React from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'
import { GoDot } from 'react-icons/go'
// import bankCheque from '../src/assets/svg/bankCheque.svg'
// import bankTransfer from '../src/assets/svg/bankTransfer.svg'
import ach from '../src/assets/svg/ach.svg'
import activity from '../src/assets/svg/activity.svg'
import vulnerability from '../src/assets/svg/vulnerability.svg'
import incident from '../src/assets/svg/incident.svg'
import report from '../src/assets/svg/report.svg'
import wallet from '../src/assets/svg/wallet.svg'

const NavItems = () => {
  return [
    {
      component: CNavGroup,
      name: 'Reporting',
      to: '/reporting',
      icon: <img src={activity} alt="Activity" className="nav-icon" />,
      items: [
        {
          component: CNavGroup,
          name: 'ACH',
          to: '/reporting/ach',
          icon: <img src={ach} alt="ACH" className="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Virement',
              to: '/reporting/ach/virement',
              icon: <GoDot className="nav-icon" />,
            },
            // {
            //   component: CNavItem,
            //   name: 'Chèque',
            //   to: '/activité/ach/chèque',
            //   icon: <img src={bankCheque} alt="Bank Cheque" className="nav-icon" />,
            // },
          ],
        },
        {
          component: CNavGroup,
          name: 'RTGS',
          to: '/reporting/rtgs',
          icon: <GoDot className="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Mouvement de Réserve',
              to: '/reporting/rtgs/mouvement',
              icon: <GoDot className="nav-icon" />,
            },
          ],
        },
      ],
    },
    {
      component: CNavItem,
      name: "Gestion d'incidents",
      to: '/gestionIncident',
      icon: <img src={incident} alt="Incident" className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Gestion de Vulnérabilités',
      to: '/gestionVulnérabilité',
      icon: <img src={vulnerability} alt="Vulnerability" className="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'CSD',
      icon: <img src={report} alt="Reporting" className="nav-icon" />,
      items: [
        // {
        //   component: CNavItem,
        //   name: 'BT',
        //   to: '/csd/bt',
        //   icon: <GoDot className="nav-icon" />,
        // },
        {
          component: CNavGroup,
          name: 'BT',
          icon: <GoDot className="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'En Cours',
              to: '/csd/bt/inProgress',
              icon: <GoDot className="nav-icon" />,
            },
          ],
        },
        {
          component: CNavGroup,
          name: 'OT',
          icon: <GoDot className="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'En Cours',
              to: '/csd/ot/inProgress',
              icon: <GoDot className="nav-icon" />,
            },
          ],
        },
        {
          component: CNavGroup,
          name: 'BIT',
          icon: <GoDot className="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'En Cours',
              to: '/csd/bit/inProgress',
              icon: <GoDot className="nav-icon" />,
            },
          ],
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Wallet',
      icon: <img src={wallet} alt="Wallet" className="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Transactions',
          to: '/wallet/transactions',
          icon: <GoDot className="nav-icon" />,
        },
      ],
    },
  ]
}

export default NavItems
