import Head from "next/head";
import gql from "graphql-tag";
import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import Error from "./ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${({ theme }) => theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          if (!data.item) return <p>No item found with ID {this.props.id}</p>;
          const { id, title, description, largeImage } = data.item;
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits! | {title}</title>
              </Head>
              <img src={largeImage} alt={title} />
              <div className="details">
                <h2>Viewing {title}</h2>
                <p>{description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
