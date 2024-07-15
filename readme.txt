# Insurance Calculator

This project is a React-based insurance calculator that allows users to estimate premiums for various insurance products based on individual information and selected coverage options.

## Features

- Calculate premiums for multiple insurance products (LTD, STD, Life / AD&D, Accidents, Dental, Vision, Critical Illness/Cancer)
- Input individual information (age, salary, zip code, state)
- Toggle between monthly and bi-weekly cost views
- Responsive design for mobile and desktop use

## Project Structure

```
insurance-calculator/
├── src/
│   ├── components/
│   │   ├── ActiveProductsToggle.js
│   │   ├── CostEstimate.js
│   │   ├── IndividualInfoForm.js
│   │   ├── ProductDetails.js
│   │   └── ProductSelector.js
│   ├── utils/
│   │   └── insuranceUtils.js
│   ├── App.js
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/insurance-calculator.git
   ```

2. Navigate to the project directory:
   ```
   cd insurance-calculator
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Dependencies

- React
- @radix-ui/react-select
- @radix-ui/react-tabs
- @radix-ui/react-toggle
- tailwindcss

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
