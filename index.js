function create_room(){
    window.location.replace(`${window.location.origin}/room/${get_roomkey()}`);
}

function connect_room(){
    create_room();
}

function get_roomkey(){
    return document.getElementById("roomcode").value;
}