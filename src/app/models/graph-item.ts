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
    public builtIn:boolean;

  }

export const graphItems: GraphItem[] = [
    {
      id: uuid(),
      graphItemType: GraphItemTypes.swimlane,
      title: 'Swimlane',
      icon: 'swimlane',
      svgIconPath: IconPaths.swimlane,
      category: GraphItemCategory.Layout,
      builtIn:true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.rectangle,
      title: 'Rectangle',
      icon: 'rectangle',
      svgIconPath: IconPaths.rectangle,
      category: GraphItemCategory.Layout,
      builtIn:true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.rounded,
      title: 'Rounded',
      icon: 'rounded',
      svgIconPath: IconPaths.rounded,
      category: GraphItemCategory.Layout,
      builtIn:true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.ellipse,
      title: 'Ellipse',
      icon: 'ellipse',
      svgIconPath: IconPaths.ellipse,
      category: GraphItemCategory.Layout,
      builtIn:true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.rhombus,
      title: 'Rhombus',
      icon: 'rhombus',
      svgIconPath: IconPaths.rhombus,
      category: GraphItemCategory.Decisions,
      builtIn:true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.triangle,
      title: 'Triangle',
      icon: 'triangle',
      svgIconPath: IconPaths.triangle,
      category: GraphItemCategory.Layout,
      builtIn:true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.cylinder,
      title: 'Cylinder',
      icon: 'cylinder',
      svgIconPath: IconPaths.cylinder,
      category: GraphItemCategory.Layout,
      builtIn:true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.actor,
      title: 'Actor',
      icon: 'actor',
      svgIconPath: IconPaths.actor,
      category: GraphItemCategory.Layout,
      builtIn:true
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.chess,
      title: 'Chess',
      icon: 'chess',
      svgIconPath: IconPaths.chess,
      category: GraphItemCategory.Decisions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.sword,
      title: 'Sword',
      icon: 'sword',
      svgIconPath: IconPaths.sword,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.trophy,
      title: 'Trophy',
      icon: 'trophy',
      svgIconPath: IconPaths.trophy,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.strategy,
      title: 'Strategy',
      icon: 'strategy',
      svgIconPath: IconPaths.strategy,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.horseriding,
      title: 'Horse Riding',
      icon: 'horseriding',
      svgIconPath: IconPaths.horseriding,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.timer1,
      title: 'Timer 1',
      icon: 'timer1',
      svgIconPath: IconPaths.timer1,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.rook,
      title: 'Rook',
      icon: 'rook',
      svgIconPath: IconPaths.rook,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.queen,
      title: 'Queen',
      icon: 'queen',
      svgIconPath: IconPaths.queen,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.horse,
      title: 'Horse',
      icon: 'horse',
      svgIconPath: IconPaths.horse,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.bishop,
      title: 'Bishop',
      icon: 'bishop',
      svgIconPath: IconPaths.bishop,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.pawn,
      title: 'Pawn',
      icon: 'pawn',
      svgIconPath: IconPaths.pawn,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.king,
      title: 'King',
      icon: 'king',
      svgIconPath: IconPaths.king,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.timer,
      title: 'Timer',
      icon: 'timer',
      svgIconPath: IconPaths.timer,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.chessboard,
      title: 'Chessboard',
      icon: 'chessboard',
      svgIconPath: IconPaths.chessboard,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.chessboard1,
      title: 'Chessboard 1',
      icon: 'chessboard1',
      svgIconPath: IconPaths.chessboard1,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.crown1,
      title: 'Crown 1',
      icon: 'crown1',
      svgIconPath: IconPaths.crown1,
      category: GraphItemCategory.Actions,
      builtIn:false
    },
    {
      id: uuid(),
      graphItemType: GraphItemTypes.queen,
      title: 'Queen',
      icon: 'queen',
      svgIconPath: IconPaths.queen,
      category: GraphItemCategory.Actions,
      builtIn:false
    }

  ];

export const  getItemByType = (type: GraphItemTypes) => {
    return  _.filter(graphItems, {graphItemTypes: type})[0];
  };
