import { DesineTokenContractMintingStatus } from "../../../../hooks/useDesineTokenContract";

export interface IsMintedAlertProps {
  isCidMintedStatus: DesineTokenContractMintingStatus;
}

export const IsMintedAlert = ({ isCidMintedStatus }: IsMintedAlertProps) => {
  return (
    <div>
      {isCidMintedStatus === "disconnected" && (
        <div className="p-2">
          <div className="alert alert-warning">
            <p>
              Please <b>connect wallet</b> to check if CID is already minted
            </p>
          </div>
        </div>
      )}
      {isCidMintedStatus === "checking" && (
        <div className="p-2">
          <div className="alert alert-info">
            <p>Checking if CID is already minted...</p>
          </div>
        </div>
      )}
      {isCidMintedStatus === "notMinted" && (
        <div className="p-2">
          <div className="alert alert-success">
            <p>This CID has not been minted yet!</p>
          </div>
        </div>
      )}
      {isCidMintedStatus === "minted" && (
        <div className="p-2">
          <div className="alert alert-error">
            <p>This CID has already been minted</p>
          </div>
        </div>
      )}
      {isCidMintedStatus === "error" && (
        <div className="p-2">
          <div className="alert alert-error">
            <p>
              Something when wrong when checking if the CID was already minted
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
