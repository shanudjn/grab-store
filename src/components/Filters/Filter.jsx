export function Filter({ sortBy, showAllInventory, showFastDelivery, productFilterDispatch }) {
    return (
        <div className="div-sidebar">
            <aside>
                <p className="filter-heading">Sort By</p>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={() => productFilterDispatch({ type: "SORT", payload: "HIGH_TO_LOW" })}
                        checked={sortBy === "HIGH_TO_LOW"}
                    />
                Price High to Low
            </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={() => productFilterDispatch({ type: "SORT", payload: "LOW_TO_HIGH" })}
                        checked={sortBy === "LOW_TO_HIGH"}
                    />
                    Price Low to High
            </label>
                <p className="filter-heading">Filters</p>

                <label>
                    <input
                        type="checkbox"
                        checked={showAllInventory}
                        onChange={() => productFilterDispatch({ type: "TOGGLE_INVENTORY" })}
                    />
                    Include Out of Stock
            </label>

                <label>
                    <input
                        type="checkbox"
                        checked={showFastDelivery}
                        onChange={() => productFilterDispatch({ type: "TOGGLE_DELIVERY" })}
                    />
                Fast Delivery Only
            </label>
                {/* <button onClick={() => productFilterDispatch({ type: "CLEAR_FILTERS" })}>Clear All Filters</button> */}
            </aside>
        </div>
    )
}