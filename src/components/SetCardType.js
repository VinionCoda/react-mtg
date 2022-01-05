import Card from "./Card";
import FlipCard from "./FlipCard";
import useGetCard from  "./useGetCard";

/* Generates either a regular card or a Flip Card */
const SetCardType = ({bol}) => {
  const name = "Coat of Arms";
  const status = "banned";
  const [data, loading] = useGetCard(name);
  const flip = bol;

  if (loading)
    return (
      <div>
        <Card />
      </div>
    );

  return (
   (flip)? <FlipCard /> : <Card image={data?.image_uris.normal} name={data?.name} status={status} />
  );
};

export default SetCardType;
