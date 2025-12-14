'use client'
 
import { usePathname } from 'next/navigation'
import React from 'react';

import type { CustomCellRendererProps } from 'ag-grid-react';

export default (params: CustomCellRendererProps) => {
    const pathname = usePathname()
    return (
        <a className='text-blue-600 underline -underline-offset-[-4px]' href={pathname+"/"+params.value} target="_self">
    ایجاد/ نمایش
        </a>
    );
};