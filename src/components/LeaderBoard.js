import { get, onValue, ref } from "firebase/database";

const LeaderBoard = ({database}) => {
    const getData = async () => {
        const snapshot = await (await get(ref(database, "users/"))).val();
        console.log(snapshot)
        return snapshot;
    }
    return <div>
        LeaderBoard
    </div>
}

export default LeaderBoard;