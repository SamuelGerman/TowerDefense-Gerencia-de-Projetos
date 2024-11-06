class PlacementTile{
    constructor({position = {x: 0, y: 0}}){
        this.position = position
        this.size = TILE_SIZE
        this.color = 'rgba(255,255,255,0.15)' //branco com alpha baixo (transparente)
    }

    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update(mouse){
        this.draw()
        if(mouse.x > this.position.x && mouse.x < this.position.x + this.size && 
            mouse.y > this.position.y && mouse.y < this.position.y + this.size){
                this.color = 'white'
        }else{
            this.color = 'rgba(255,255,255,0.15)'
        }
    }
}

class Enemy {
    constructor({position = {x: 0, y: 0}}) {
        this.position = position
        this.width = 100
        this.height = 100
        this.speed = 1
        this.waypoints = waypoints; // Array de waypoints
        this.currentWaypointIndex = 1; // Índice do waypoint alvo atual
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
    
    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();

        const waypoint = this.waypoints[this.currentWaypointIndex]
        const dx = waypoint.x - this.center.x
        const dy = waypoint.y - this.center.y
        const angle = Math.atan2(dy, dx);

        // Atualiza a posição do inimigo de acordo com o ângulo
        this.position.x += Math.cos(angle) * this.speed
        this.position.y += Math.sin(angle) * this.speed
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        // Verifica se o inimigo chegou ao waypoint
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5 && this.currentWaypointIndex < this.waypoints.length - 1) {
            this.currentWaypointIndex = (this.currentWaypointIndex + 1) // Avança para o próximo waypoint
        }
    }
}