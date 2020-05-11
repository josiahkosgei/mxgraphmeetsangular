import { GraphItemTypes } from './graph-item-types.enum';
import { IconPaths } from './icon-paths.enum';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { GraphItemCategory } from './graph-item-category.enum';

export class GraphItem {
    public id: string;
    public graphItemType: GraphItemTypes;
    public icon: string;
    public title: string;
    public svgIconPath: IconPaths;
    public category: GraphItemCategory;
    public builtIn: boolean;

  }

export const graphItems: GraphItem[] = [
    {
      id: uuid(),
      graphItemType: GraphItemTypes.swimlane,
      title: 'Predefined Process',
      icon: 'swimlane',
      svgIconPath: IconPaths.swimlane,
      category: GraphItemCategory.Layout,
      builtIn: true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.rectangle,
      title: 'Process',
      icon: 'rectangle',
      svgIconPath: IconPaths.rectangle,
      category: GraphItemCategory.Layout,
      builtIn: true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.rounded,
      title: 'Rounded',
      icon: 'rounded',
      svgIconPath: IconPaths.rounded,
      category: GraphItemCategory.Layout,
      builtIn: true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.startProcess,
      title: 'Stat Process',
      icon: 'startProcess',
      svgIconPath: IconPaths.startProcess,
      category: GraphItemCategory.Layout,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.stopProcess,
      title: 'Stop Process',
      icon: 'stopProcess',
      svgIconPath: IconPaths.stopProcess,
      category: GraphItemCategory.Layout,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.ellipse,
      title: 'Start',
      icon: 'ellipse',
      svgIconPath: IconPaths.ellipse,
      category: GraphItemCategory.Layout,
      builtIn: true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.condition,
      title: 'Decision',
      icon: 'rhombus',
      svgIconPath: IconPaths.condition,
      category: GraphItemCategory.Decisions,
      builtIn: true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.triangle,
      title: 'Data',
      icon: 'triangle',
      svgIconPath: IconPaths.triangle,
      category: GraphItemCategory.Layout,
      builtIn: true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.cylinder,
      title: 'Direct data',
      icon: 'cylinder',
      svgIconPath: IconPaths.cylinder,
      category: GraphItemCategory.Layout,
      builtIn: true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.actor,
      title: 'User',
      icon: 'actor',
      svgIconPath: IconPaths.actor,
      category: GraphItemCategory.Layout,
      builtIn: true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.graph,
      title: 'Receipt',
      icon: 'receipt',
      svgIconPath: IconPaths.graph,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.sword,
      title: 'Bank',
      icon: 'bank',
      svgIconPath: IconPaths.bank,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.bankbook,
      title: 'Bank Book',
      icon: 'bankbook',
      svgIconPath: IconPaths.bankbook,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.strategy,
      title: 'Credit Card',
      icon: 'credit-card',
      svgIconPath: IconPaths.strategy,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.onlinebanking,
      title: 'Online Banking',
      icon: 'onlinebanking',
      svgIconPath: IconPaths.onlinebanking,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.timer1,
      title: 'ATM',
      icon: 'atm',
      svgIconPath: IconPaths.timer1,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.money,
      title: 'Money',
      icon: 'money',
      svgIconPath: IconPaths.money,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.smartphonepayment,
      title: 'Smartphone Payment',
      icon: 'smartphonepayment',
      svgIconPath: IconPaths.smartphonepayment,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.horse,
      title: 'Cloud Banking',
      icon: 'cloudbanking',
      svgIconPath: IconPaths.horse,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.portfolio,
      title: 'Portfolio',
      icon: 'portfolio',
      svgIconPath: IconPaths.portfolio,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.banking,
      title: 'Banking',
      icon: 'banking',
      svgIconPath: IconPaths.banking,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.smartphone,
      title: 'Smartphone',
      icon: 'smartphone',
      svgIconPath: IconPaths.smartphone,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.timer,
      title: 'Smartphone 1',
      icon: 'smartphone1',
      svgIconPath: IconPaths.timer,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.bankaccount1,
      title: 'Bank Account 1',
      icon: 'bankaccount1',
      svgIconPath: IconPaths.bankaccount1,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.bankaccount,
      title: 'Bank Account',
      icon: 'bankaccount',
      svgIconPath: IconPaths.bankaccount,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.borrow,
      title: 'Borrow',
      icon: 'borrow',
      svgIconPath: IconPaths.borrow,
      category: GraphItemCategory.Actions,
      builtIn: false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.smartphonepayment,
      title: 'Smartphone Payment',
      icon: 'smartphonepayment',
      svgIconPath: IconPaths.smartphonepayment,
      category: GraphItemCategory.Actions,
      builtIn: false
    }

  ];

export const  getItemByType = (type: GraphItemTypes) => {
    return  _.filter(graphItems, {graphItemTypes: type})[0];
  };
