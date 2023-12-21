export const Input = (
  { type, lableText, name, value, setValue }:
  { type: string, lableText: string, name: string, value: string, setValue: (val: string) => void }) => 
{
  return (
    <>
      <label htmlFor={'input-' + name}>{lableText}: </label>
      <input
        id={'input-' + name}
        name={name}
        type={type}
        value={value}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
      />
      <br />
    </>
  )
}
