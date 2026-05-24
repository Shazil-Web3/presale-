import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function ReferralHub() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-acid-lime">Referral Hub</h2>
      <p className="text-sm text-muted-foreground">
        Track unique referral links and monitor reward velocity from converted
        on-chain participants.
      </p>
      <Input value="https://bitraxx.app/r/0x21...7b" readOnly />
      <Button variant="secondary">Copy Referral Link</Button>
    </div>
  );
}
