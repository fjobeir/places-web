import { useEffect, useState } from "react"
import './CategoriesBar.css'

const CategoriesBar = () => {
    const [categories, setCategories] = useState([])
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
            return <div key={i} className={`category`}>
                <img src={category?.icon} alt={category.title} />
            </div>
        })}
    </div>
}

export default CategoriesBar