import styled from "@emotion/styled";

const Arrow = styled.div`
  display: block;
  margin: 30px auto;
  width: 16px;
  height: 16px;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  transform: rotate(-45deg);
  position: absolute;
  left: 16px;
  top: -6px;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

interface ArrowLeftProps {
    handleClose: () => void;
}

export const ArrowLeft = (props: ArrowLeftProps) => {
    return <Arrow onClick={props.handleClose}/>
}