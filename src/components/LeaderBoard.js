import { get, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import uniqid from "uniqid"

const LeaderBoard = ({database, levelHolder}) => {
    const [hiya, setHiya] = useState({});
    const getData = async () => {
        const snapshot = (await get(ref(database, "levels/" + levelHolder + "/users/"))).val();
        setHiya(snapshot);
    }
    useEffect(() => {
       getData();
    },[]);
   
    return <div className="leaderboardholder">
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(hiya).map((x) => {
                        return (
                            <tr key={uniqid()}>
                                <td>{hiya[x].id}</td>
                                <td>{hiya[x].time}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default LeaderBoard;