import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'shop-by-department',
        title    : 'ShopByDepartment',
        translate: 'Nav.ShopByDepartment',
        type     : 'group',
        children : [
            {
                id       : 'electronics',
                title    : 'Electronics',
                translate: 'Nav.Electronics',
                type     : 'item',
                icon     : 'computer',
                url      : '/electronics',
            },
            {
                id       : 'arts-crafts',
                title    : 'ArtsCrafts',
                translate: 'Nav.ArtsCrafts',
                type     : 'item',
                icon     : 'create',
                url      : '/arts&crafts',
            },
            {
                id       : 'automotive',
                title    : 'Automotive',
                translate: 'Nav.Automotive',
                type     : 'item',
                icon     : 'directions_car',
                url      : '/automotive',
            },
            {
                id       : 'women-fashion',
                title    : 'WomenFashion',
                translate: 'Nav.WomenFashion',
                type     : 'item',
                icon     : 'pregnant_woman',
                url      : '/womenfashion',
            },
            {
                id       : 'men-fashion',
                title    : 'MenFashion',
                translate: 'Nav.MenFashion',
                type     : 'item',
                icon     : 'rowing',
                url      : '/menfashion',
            },
        ]
    }
];
