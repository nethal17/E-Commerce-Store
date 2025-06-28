import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../../lib/axios.js"
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");
                setRecommendations(res.data);
            } catch (error) {
                toast.error(error.response.data.message || "Failed to fetch recommendations");
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, []);

    if (loading) return <LoadingSpinner />;
    
    return (
        <div className='mt-8'>
            <h3 className='text-3xl font-semibold text-sky-400'>People also bought</h3>
            <div className='grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg: grid-col-3'>
                {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default PeopleAlsoBought;