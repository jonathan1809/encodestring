import React, { useState } from 'react';
import { styled } from 'styled-components';
import isEmpty from 'lodash/isEmpty'
import { Button } from './components/Button';
import { TextField } from './components/TextField';

type ParseList = {
  encode: string
  decode: DecodeObject,
}

type DecodeObject = {
  id: string
  first_name: string,
  last_name: string,
}

function App() {
  const [encodedString, setEncodedString] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [decodeList, setDecodeList] = useState<ParseList[]>([])

  const decodeString = (encode: string): DecodeObject => {
    if(encode.match(/^([A-Za-z]+)([A-Za-z]+)(\d+)$/)){ throw new Error('Invalid encoded string format.'); }

    const regex = /^([A-Za-z]+)0*([A-Za-z]+)0+([1-9]+)$/;
    const match = encode.match(regex);

    if (match) {
      const [, first_name, last_name, id] = match;
      return { first_name, last_name, id };
    }

    throw new Error('Invalid encoded string format.');
  }

  const handleEncodedStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEncodedString(event.target.value)
  }

  const handleButtonClick = () => {
    try {
      const decoded = decodeString(encodedString)
      const newDecodedList = [...decodeList, { encode: encodedString, decode: decoded}]
      setDecodeList(newDecodedList)
      setEncodedString('')
      setErrorMessage('')
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <Container>
      <FormContainer>
        <label htmlFor="encode">Encoded String</label>
        <TextField
          type="text"
          id='encode'
          value={encodedString}
          onChange={handleEncodedStringChange}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button onClick={handleButtonClick} data-testid="decode-button">Decode</Button>
      </FormContainer>
      <div>
        {!isEmpty(decodeList) && (
          <Table>
            <thead>
              <Tr>
                <Th>Encode</Th>
                <Th>Decode</Th>
              </Tr>
            </thead>
            <tbody>
              {decodeList.map((element: ParseList, index: number) => {
                return (
                  <Tr key={index}>
                    <Td>{element.encode}</Td>
                    <Td>{JSON.stringify(element.decode)}</Td>
                  </Tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </div>
      <Footer>
        <p>Jonathan David Medina Gomez</p>
      </Footer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  margin: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`
const FormContainer = styled.div`
  width: 500px;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  margin: 50px 0px;
`

const ErrorMessage = styled.span`
  color: #e83a13fe;
  font-size: 14px;
  line-height: 17px;
  font-weight: 600;
  margin: 10px 0 0 5px;
  animation: slideIn 0.5s;

  @keyframes slideIn {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const Tr = styled.tr`
  animation: slideIn 0.5s;

  &:nth-child(even) {
    background-color: #80e0f693;
  }
  &:nth-child(odd) {
    background-color: #eaebecfe;
  }
  @keyframes slideIn {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

const Th = styled.th`
  text-align: left;
  padding: 8px;
  background-color: #0acdf9fe;
  color: white;
`

const Td = styled.th`
  text-align: left;
  padding: 8px;
`

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  margin: 0;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  padding: 20px;
`