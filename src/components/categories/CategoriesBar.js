import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../contexts/AppContext"
import './CategoriesBar.css'

const CategoriesBar = () => {
    const [categories, setCategories] = useState([])
    const appCtx = useContext(AppContext)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}categories`)
            .then(response => {
                response.json().then(categories => {
                    if (categories?.success) {
                        setCategories(categories.data)
                    }
                })
            })
            .catch(e => console.log(e))
    }, [])

    return <div>
        {categories.map((category, i) => {
            return <div className={`category`} key={i} onClick={() => { appCtx.setPlaces(category.Places) }}>
                <div className={`categoryIcon`}>
                    <img src={category?.icon} alt={category.title} />
                </div>
                <div className="categoryTitle">{category.title}</div>
            </div>
        })}
    </div>
}

export default CategoriesBar