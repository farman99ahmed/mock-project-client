import Pusher from "pusher-js";

let instance;

const getPusherInstance = () => {
    if (instance) {
        return instance;
    } else {
        instance = new Pusher(process.env.REACT_APP_PUSHER_ID, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER
        });
        return instance;
    }
}

export default getPusherInstance;