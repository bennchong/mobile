enum CERT_VALIDITY_STATUS {
  VALIDATING = "validating",
  VALID = "valid",
  INVALID = "invalid"
}

enum CERT_STORAGE {
  SUCCESS = "success",
  FAILURE = "failure"
}

enum CERT_FETCHING {
  NOT_OK = "return value not ok",
  IS_OK = "return value is ok",
  ERROR = "Fetching Failed"
}

const sampleCert = {
  ttl: 180,
  test: "yay",
  document: {
    schema: "tradetrust/v1.0",
    data: {
      id: "891ca69d-29f3-47b0-ab01-c05f64b0780f:string:12345671",
      issuers: [
        {
          name:
            "5a091ac6-46da-420a-acfc-62c38c710c2e:string:Ministry of Manpower",
          documentStore:
            "971db22d-832c-41d9-bee4-92e5ce3d8b75:string:0x590F8DFFdb113e1Dcf4974DEaA9b52A8251cec29"
        }
      ],
      pass: {
        type: "b4d228ca-c27e-4fe6-9411-643b4e90b2b4:string:Employment Pass",
        status: "9fdde720-86f3-4726-9bc7-73c508555aca:string:Live",
        expiryDate:
          "10ea150d-6f7a-416b-9a2f-ba1a7ccdf48b:string:2020-11-14T00:00:00+00:00",
        legalTillDate:
          "0f22268e-5370-4673-bb34-8160a274406c:string:2020-11-14T00:00:00+00:00",
        applicationDate:
          "56e63530-0663-43b9-b7dc-8644e301fe7b:string:2020-11-14T00:00:00+00:00",
        issueDate:
          "b90e62d8-04bd-4180-b805-2712a7984ab5:string:2018-11-14T00:00:00+00:00",
        renewalDate:
          "ec828846-efa6-45cd-bc99-476c9e48e511:string:2020-12-25T00:00:00+00:00",
        isMultipleJourney: "1dea6fc5-b053-49fc-bd90-06910c61505f:boolean:true"
      },
      recipient: {
        photo:
          "a284e815-9fa1-4637-bcf0-e74c5e3ce46c:string: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",
        fin: "a5321077-d863-4501-9eae-96d897e204ce:string:G9999999A",
        name: "be03ae12-fdd4-492d-936f-17d9d77f9df9:string:justina tan",
        occupation: {
          frameworkName:
            "f4c0cdec-6f80-452f-bb23-124a106d44ce:string:framework",
          frameworkVersion:
            "854364b6-3b50-4330-9d7d-570a90358fc9:string:version1",
          code: "77e1b573-bf51-4e7a-a841-3aeccd3082f0:string:123",
          description: "8a94aa6c-7646-4eb9-bbd0-730d912629e1:string:asd"
        },
        country: "183bcd89-5343-419d-93e5-0ecbb61bd889:string:malaysia",
        dob:
          "e23804c1-52ac-42a1-9f75-c104151e716e:string:2018-11-14T00:00:00+00:00",
        maritalStatus: "c85daa88-2cfe-4f0e-8ad1-5370a453f1a7:string:single",
        address: {
          postalCode: "46176982-56e5-48bb-8e18-e5d180f9071f:number:123456",
          postOfficeBoxNumber:
            "551b3022-e1b1-4e6e-bee0-90f39e615d07:string:#03-08",
          streetAddress:
            "c9346fe0-ff3d-40a7-9d3e-0f0935d3adce:string:Block 123 toa payoh ave 4"
        }
      },
      employer: {
        uen: "9a21b9e0-cacf-452e-8d83-13ab811f491a:string:123981298391",
        name: "a6d3e1a1-6974-4721-b454-11f938273631:string:trina tan",
        sector: "ad19d53c-b4b0-4082-aa91-bef4443e852d:string:construction"
      }
    },
    privacy: {},
    signature: {
      type: "SHA3MerkleProof",
      targetHash:
        "cb7b0ccaf3c9f496a2f8a8dd2628f365cff5cb28c5e41a0ccbba12218757bcc6",
      proof: [],
      merkleRoot:
        "cb7b0ccaf3c9f496a2f8a8dd2628f365cff5cb28c5e41a0ccbba12218757bcc6"
    }
  }
};

export { CERT_VALIDITY_STATUS, CERT_STORAGE, CERT_FETCHING, sampleCert };
