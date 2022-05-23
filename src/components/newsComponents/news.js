
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from "react-top-loading-bar";
import { setNewsData } from "../../actions";
import icons from "../../Asset/SVG/svgIcons";

const getNewsData = async (dispatch) => {
    try {
        console.log("in News data");
        const res = await fetch("https://newsapi.org/v2/everything?q=climate+change&searchIn=title&sortBy=publishedAt&apiKey=b71a679ef64548539791408fb3d98d24");
        const data = await res.json()
        console.log(data);
        dispatch(setNewsData(data));
    } catch (error) {
        alert(`Something Went Wrong :(\n${error}`);
    }
}

const News = () => {
    const dispatch = useDispatch();
    const newsData = useSelector(state => state.newsData);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (Object.keys(newsData).length == 0) {
            getNewsData(dispatch);
        }
    }, [dispatch]);
    return (
        <div className="other-details-cont">
            {newsData?.articles?.map(dataElem =>
            (<a href={dataElem?.url || '#'} target="_blank" className="newsCotainer OD-div">
                <p style={{ marginBottom: "0.3rem" }} className="info-p">Source: {dataElem?.source?.name || '-'}</p>
                <img className="newsImage" src={dataElem?.urlToImage} />
                <h2 className="newsTitle info-h1">{dataElem?.title || '-'}</h2>
            </a>
            ))}

        </div>
    );
};

export default News;