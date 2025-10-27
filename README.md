# 2048 Game

A classic 2048 puzzle game built with Node.js and Express.

## 🎮 Game Description

2048 is a sliding block puzzle game where you combine tiles with the same number to reach the 2048 tile. Use arrow keys to move tiles in four directions, and try to achieve the highest score possible!

## 🚀 Features

- Classic 2048 gameplay
- Smooth animations and responsive design
- Score tracking
- Game over detection
- Clean and modern UI

## 🛠️ Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, JavaScript
- **Development**: Nodemon for hot reloading

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/GoProSMC/2048-game.git
cd 2048-game
```

2. Install dependencies:
```bash
npm install
```

## 🎯 How to Run

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The game will be available at `http://localhost:3000`

## 🎮 How to Play

1. Use arrow keys (↑ ↓ ← →) to move tiles
2. When two tiles with the same number touch, they merge into one
3. Try to create a tile with the number 2048 to win
4. The game ends when you can't make any more moves

## 📁 Project Structure

```
2048-game/
├── public/
│   ├── index.html    # Main HTML file
│   ├── style.css     # Game styling
│   └── game.js       # Game logic
├── server.js         # Express server
├── package.json      # Project dependencies
└── README.md         # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] High score persistence
- [ ] Multiple game modes
- [ ] Mobile touch controls
- [ ] Sound effects
- [ ] Themes and customization

---

Enjoy playing 2048! 🎉