import React from "react";

export const List = ({
    items,
    resourceName,
    itemComponent: ItemComponent,
}) => {
    return (
        <>
            {
                items.map((item, i) => (
                    <ItemComponent key={i} {...{ [resourceName]: item }}
                ))}
        </>
    )



}