//@flow
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "../modal";
import Paragraph from "../../library/paragraph/paragraph";
import TextArea from "../../library/inputs/textarea";
import Button from "../../library/buttons/button";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import Trash from "../../assets/svgs/bin.svg";
import { RED } from "../../styles/colors";

const TrashIcon = styled(Trash)`
  width: 20px;
  height: 20px;
  opacity: 0.5;
  cursor: pointer;
  path {
    fill: ${RED};
  }
`;

const Content = styled.div`
  width: 450px;
  text-align: left;
  box-sizing: border-box;
  padding: 25px 20px;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 340px;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 10px 0;
`;

const NotesModal = ({
  item,
  onDismiss
}: {
  item: {
    notes: string,
    title: string,
    firebaseId: number
  },
  onDismiss: Function
}) => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);
  const [notes, setNotes] = useState(false);

  const onAddNotesClick = firebaseId => {
    firebase
      .database()
      .ref(`/users/${context.user.uid}/events/${firebaseId}`)
      .update({ notes });
  };

  const onNotesDelete = firebaseId => {
    firebase
      .database()
      .ref(`/users/${context.user.uid}/events/${firebaseId}`)
      .update({ notes: "" });
  };

  return (
    <Modal onDismiss={onDismiss}>
      <Content>
        <Paragraph customStyle={{ textAlign: "center", fontWeight: "bold" }}>
          {item.title}
        </Paragraph>
        {item.notes && (
          <div>
            <Paragraph customStyle={{ fontWeight: "bold", margin: 0 }}>
              Notes:
            </Paragraph>
            <Paragraph customStyle={{ margin: 0 }}>{item.notes}</Paragraph>
            <Icon>
              <TrashIcon onClick={() => onNotesDelete(item.firebaseId)} />
            </Icon>
          </div>
        )}
        {!item.notes && (
          <div>
            <TextArea
              onChange={e => setNotes(e.target.value)}
              title="No notes yet, add some."
            />
            <Button
              disabled={!notes}
              onClick={() => onAddNotesClick(item.firebaseId)}
              title="Add Notes"
            />
          </div>
        )}
      </Content>
    </Modal>
  );
};

export default NotesModal;
