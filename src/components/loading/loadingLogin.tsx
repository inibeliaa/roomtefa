/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ }: {}) => {
    return (
        <div className="fixed translate-x-[9.5%] translate-y-1 z-50 inset-0 overflow-y-hidden p-4 bg-white/5 md:p-8 flex">
            <div className="flex w-[50%] h-[98%] justify-center backdrop-blur-sm pe-14 items-center">
                <ReactLoading type={'bubbles'} color={'#3F9272'} height={250} width={250} />
            </div>
        </div>
    )
};
 
export default Loading;