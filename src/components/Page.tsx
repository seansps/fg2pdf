import React from "react";

interface PageProps {
  children?: React.ReactNode;
}

export const Page = ({children}: PageProps) => {
    return (
        <div className='page'>
            <div className='subpage'>
                {children}
            </div>
        </div>
    )
}

export default Page;