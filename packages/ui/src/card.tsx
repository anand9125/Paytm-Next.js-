import React from "react"

export default function Card({
  children,
  title
}:{
  children?:React.ReactNode;
  title:string
}):JSX.Element{

  return (
    <div className="  p-4 border border-slate-500 rounded-xl bg-neutral-100">
      <h1 className="text-xl border-b border-slate-300 pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  )

}