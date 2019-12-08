import React from 'react';
import pageAccess from "../../auth/AuthorizationRoles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle, faList } from '@fortawesome/free-solid-svg-icons';

const navMenus = [
  {
    'type': 'divider'
  },
  {
    'id': 'request',
    'title': 'Solicitar',
    'type': 'item',
    'url': '/solicitar',
    auth: pageAccess.request,
    'icon': () => <FontAwesomeIcon icon={faMotorcycle} />
  },
  {
    'id': 'allWorkOrders',
    'title': 'Pedidos',
    'type': 'item',
    'url': '/pedidos',
    auth: pageAccess.allWorkOrders,
    'icon': () => <FontAwesomeIcon icon={faList} />
  }
]

export default navMenus