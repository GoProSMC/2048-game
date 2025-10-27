class Game2048 {
    constructor() {
        this.grid = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore') || 0;
        this.size = 4;
        this.tileContainer = document.getElementById('tile-container');
        this.scoreElement = document.getElementById('score');
        this.bestScoreElement = document.getElementById('best-score');
        this.gameMessage = document.getElementById('game-message');
        this.messageText = document.getElementById('message-text');

        this.init();
        this.setupEventListeners();
    }

    init() {
        this.grid = Array(this.size)
            .fill()
            .map(() => Array(this.size).fill(0));
        this.score = 0;
        this.updateScore();
        this.updateBestScore();
        this.clearTiles();
        this.hideMessage();
        this.addRandomTile();
        this.addRandomTile();
        this.render();
    }

    setupEventListeners() {
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.init();
        });

        document.getElementById('try-again-btn').addEventListener('click', () => {
            this.init();
        });

        this.setupSwipeControls();
    }

    setupSwipeControls() {
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        const gameContainer = document.querySelector('.game-container');

        const handleStart = (clientX, clientY) => {
            startX = clientX;
            startY = clientY;
            isDragging = true;
        };

        const handleEnd = (clientX, clientY) => {
            if (!isDragging) return;

            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            const threshold = 30;

            if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // 좌우 이동
                    if (deltaX > 0) {
                        this.move('right');
                    } else {
                        this.move('left');
                    }
                } else {
                    // 상하 이동
                    if (deltaY > 0) {
                        this.move('down');
                    } else {
                        this.move('up');
                    }
                }
            }

            isDragging = false;
        };

        // 마우스 이벤트
        gameContainer.addEventListener('mousedown', (e) => {
            handleStart(e.clientX, e.clientY);
        });

        document.addEventListener('mouseup', (e) => {
            if (isDragging) {
                handleEnd(e.clientX, e.clientY);
            }
        });

        // 터치 이벤트
        gameContainer.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            handleStart(touch.clientX, touch.clientY);
            e.preventDefault();
        });

        document.addEventListener('touchend', (e) => {
            if (isDragging && e.changedTouches.length > 0) {
                const touch = e.changedTouches[0];
                handleEnd(touch.clientX, touch.clientY);
                e.preventDefault();
            }
        });

        // 키보드 지원
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.move('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.move('down');
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.move('left');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.move('right');
            }
        });
    }

    move(direction) {
        let moved = false;
        const oldGrid = JSON.stringify(this.grid);

        if (direction === 'left') {
            moved = this.moveLeft();
        } else if (direction === 'right') {
            moved = this.moveRight();
        } else if (direction === 'up') {
            moved = this.moveUp();
        } else if (direction === 'down') {
            moved = this.moveDown();
        }

        const newGrid = JSON.stringify(this.grid);
        moved = oldGrid !== newGrid;

        if (moved) {
            this.addRandomTile();
            this.render();
            this.updateScore();

            if (this.checkWin()) {
                setTimeout(() => this.showMessage('승리!', 'game-won'), 200);
            } else if (this.checkGameOver()) {
                setTimeout(() => this.showMessage('게임 오버!', 'game-over'), 200);
            }
        }
    }

    moveLeft() {
        let moved = false;
        for (let i = 0; i < this.size; i++) {
            const row = this.grid[i].filter((val) => val !== 0);
            const merged = [];

            for (let j = 0; j < row.length; j++) {
                if (j < row.length - 1 && row[j] === row[j + 1] && !merged.includes(j)) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j + 1, 1);
                    merged.push(j);
                }
            }

            while (row.length < this.size) {
                row.push(0);
            }

            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] !== row[j]) {
                    moved = true;
                }
                this.grid[i][j] = row[j];
            }
        }
        return moved;
    }

    moveRight() {
        let moved = false;
        for (let i = 0; i < this.size; i++) {
            const row = this.grid[i].filter((val) => val !== 0);
            const merged = [];

            for (let j = row.length - 1; j >= 0; j--) {
                if (j > 0 && row[j] === row[j - 1] && !merged.includes(j)) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j - 1, 1);
                    merged.push(j - 1);
                    j--;
                }
            }

            while (row.length < this.size) {
                row.unshift(0);
            }

            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] !== row[j]) {
                    moved = true;
                }
                this.grid[i][j] = row[j];
            }
        }
        return moved;
    }

    moveUp() {
        let moved = false;
        for (let j = 0; j < this.size; j++) {
            const column = [];
            for (let i = 0; i < this.size; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }

            const merged = [];
            for (let i = 0; i < column.length; i++) {
                if (i < column.length - 1 && column[i] === column[i + 1] && !merged.includes(i)) {
                    column[i] *= 2;
                    this.score += column[i];
                    column.splice(i + 1, 1);
                    merged.push(i);
                }
            }

            while (column.length < this.size) {
                column.push(0);
            }

            for (let i = 0; i < this.size; i++) {
                if (this.grid[i][j] !== column[i]) {
                    moved = true;
                }
                this.grid[i][j] = column[i];
            }
        }
        return moved;
    }

    moveDown() {
        let moved = false;
        for (let j = 0; j < this.size; j++) {
            const column = [];
            for (let i = 0; i < this.size; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }

            const merged = [];
            for (let i = column.length - 1; i >= 0; i--) {
                if (i > 0 && column[i] === column[i - 1] && !merged.includes(i)) {
                    column[i] *= 2;
                    this.score += column[i];
                    column.splice(i - 1, 1);
                    merged.push(i - 1);
                    i--;
                }
            }

            while (column.length < this.size) {
                column.unshift(0);
            }

            for (let i = 0; i < this.size; i++) {
                if (this.grid[i][j] !== column[i]) {
                    moved = true;
                }
                this.grid[i][j] = column[i];
            }
        }
        return moved;
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    render() {
        const oldTiles = {};

        // 기존 타일 위치 저장
        Array.from(this.tileContainer.children).forEach(tile => {
            const key = `${tile.textContent}`;
            if (!oldTiles[key]) oldTiles[key] = [];
            oldTiles[key].push({
                element: tile,
                left: tile.style.left,
                top: tile.style.top
            });
        });

        this.clearTiles();

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] !== 0) {
                    this.createTile(this.grid[i][j], i, j);
                }
            }
        }
    }

    createTile(value, row, col) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${value}`;
        if (value > 2048) {
            tile.className = 'tile tile-super';
        }
        tile.textContent = value;
        tile.dataset.value = value;
        tile.dataset.row = row;
        tile.dataset.col = col;

        const cellPercent = 22.75;
        const gapPercent = 3;
        tile.style.left = `${col * (cellPercent + gapPercent)}%`;
        tile.style.top = `${row * (cellPercent + gapPercent)}%`;

        this.tileContainer.appendChild(tile);
    }

    clearTiles() {
        this.tileContainer.innerHTML = '';
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
            this.updateBestScore();
        }
    }

    updateBestScore() {
        this.bestScoreElement.textContent = this.bestScore;
    }

    checkWin() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }

    checkGameOver() {
        // 빈 칸이 있으면 게임 오버가 아님
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) {
                    return false;
                }
            }
        }

        // 합칠 수 있는 타일이 있는지 확인
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const current = this.grid[i][j];
                if (
                    (i > 0 && this.grid[i - 1][j] === current) ||
                    (i < this.size - 1 && this.grid[i + 1][j] === current) ||
                    (j > 0 && this.grid[i][j - 1] === current) ||
                    (j < this.size - 1 && this.grid[i][j + 1] === current)
                ) {
                    return false;
                }
            }
        }

        return true;
    }

    showMessage(text, className) {
        this.messageText.textContent = text;
        this.gameMessage.className = `game-message ${className}`;
        this.gameMessage.style.display = 'block';
    }

    hideMessage() {
        this.gameMessage.style.display = 'none';
    }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});
