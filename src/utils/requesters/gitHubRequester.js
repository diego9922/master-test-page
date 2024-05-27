import axios from "axios";

const gitHubRequester = ()=>{
    return axios.create({
        baseURL: process.env.REACT_APP_GIT_HUB_BASE_URL_API,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

const getRepositoriesByUser = async (user, sort=null, order='desc', perPage=10, page=1)=>{
    try{
        const repositoriesRequest = await gitHubRequester().get(`search/repositories?q=${encodeURIComponent("user:"+user.trim())}`,{
            params:{
                ...(sort && {sort}),
                order,
                per_page: perPage,
                page
            }
        });
        //.get(`/orgs/${user}/repos`);
        console.log(repositoriesRequest.data);
        return repositoriesRequest.data;
        /*repositoriesRequest.data.sort((current, next)=>{
            return next.watchers_count - current.watchers_count;
        });
        */
    }catch(error){
        console.error(error);
        return [];
    }
};

export { getRepositoriesByUser };

export default gitHubRequester;