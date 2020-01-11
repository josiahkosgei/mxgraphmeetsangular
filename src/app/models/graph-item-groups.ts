import { GraphItemCategory } from './graph-item-category.enum';

import { GraphItem } from './graph-item';

export class GraphItemGroups {
    category: GraphItemCategory;
    categoryTranslation: string;
    items: GraphItem[];
}
