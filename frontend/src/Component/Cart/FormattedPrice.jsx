const FormattedPrice = ({ amount }) => {
  const validAmount = isNaN(amount) ? 0 : Number(amount);

  const formattedAmount = validAmount.toLocaleString("bn-BD", {
    style: "currency",
    currency: "BDT", // Use "BDT" instead of "TAKA"
    minimumFractionDigits: 2,
  });

  return <span>{formattedAmount}</span>;
};

export default FormattedPrice;
