function MessageService() {
    var messageService = new Object();
    messageService.show = function(node = document.getElementById(), message) {
        node.style.display = "block";
        node.innerHTML = message;
        setTimeout(() => {
            node.style.display = "none";
        }, 2000);
    };
    return messageService;
}