import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function WalletSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-acid-lime">Wallet Settings</h2>
      <Input placeholder="Primary payout wallet" />
      <Input placeholder="Notification email (optional)" />
      <Button>Save Preferences</Button>
    </div>
  );
}
