import React from "react";

interface PageProps {
  children?: React.ReactNode;
}

export const Page = ({children}: PageProps) => {
  return (
    <div className='page'>
      {children}
    </div>
  )
}

export default Page;